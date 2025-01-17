//
// IntroduceQueryExpressions.cs
//
// Modified by Luís Reis <luiscubal@gmail.com> (Copyright (C) 2013)
//
// Copyright header of the original version follows:
//
// Copyright (c) 2011 AlphaSierraPapa for the SharpDevelop Team
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
// to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.
using System;
using System.Diagnostics;
using System.Linq;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.PatternMatching;

namespace ICSharpCode.NRefactory.CSharp
{
    static class NRefactoryExtensions
    {
        public static T Detach<T>(this T node) where T : AstNode
        {
            node.Remove();
            return node;
        }

        public static T CopyAnnotationsFrom<T>(this T node, AstNode other) where T : AstNode
        {
            foreach (object annotation in other.Annotations) {
                node.AddAnnotation(annotation);
            }
            return node;
        }

        public static Expression WithName(this Expression node, string patternGroupName)
        {
            return new NamedNode(patternGroupName, node);
        }
    }

    /// <summary>
    /// Decompiles query expressions.
    /// Based on C# 4.0 spec, §7.16.2 Query expression translation
    /// </summary>
    public class IntroduceQueryExpressions
    {
        static readonly InvocationExpression castPattern = new InvocationExpression {
            Target = new MemberReferenceExpression {
                Target = new AnyNode("inExpr"),
                MemberName = "Cast",
                TypeArguments = { new AnyNode("targetType") }
            }};

        public Expression ConvertFluentToQuery(Expression node)
        {
            node = node.Clone();

            var artificialParent = new ExpressionStatement();
            artificialParent.Expression = node;

            DecompileQueries(node);
            // After all queries were decompiled, detect degenerate queries (queries not property terminated with 'select' or 'group')
            // and fix them, either by adding a degenerate select, or by combining them with another query.
            foreach (QueryExpression query in artificialParent.Descendants.OfType<QueryExpression>()) {
                QueryFromClause fromClause = (QueryFromClause)query.Clauses.First();
                if (IsDegenerateQuery(query)) {
                    string identifierName = fromClause.Identifier;

                    // introduce select for degenerate query
                    query.Clauses.Add(new QuerySelectClause { Expression = new IdentifierExpression(identifierName) });
                }

                if (fromClause.Type.IsNull) {
                    // See if the data source of this query is a degenerate query,
                    // and combine the queries if possible.
                    QueryExpression innerQuery = fromClause.Expression as QueryExpression;
                    while (IsDegenerateQuery(innerQuery)) {
                        QueryFromClause innerFromClause = (QueryFromClause)innerQuery.Clauses.First();
                        if (fromClause.Identifier != innerFromClause.Identifier && !innerFromClause.Identifier.StartsWith("<>"))
                            break;
                        // Replace the fromClause with all clauses from the inner query
                        fromClause.Remove();
                        foreach (var identifierChild in innerQuery.Descendants.OfType<Identifier>().Where(identifier => identifier.Name == innerFromClause.Identifier)) {
                            //When the identifier is "<>X", then replace it with the outer one
                            identifierChild.ReplaceWith(fromClause.IdentifierToken.Clone());
                        }
                        QueryClause insertionPos = null;
                        foreach (var clause in innerQuery.Clauses) {
                            query.Clauses.InsertAfter(insertionPos, insertionPos = clause.Detach());
                        }
                        fromClause = innerFromClause;
                        innerQuery = fromClause.Expression as QueryExpression;
                    }
                }
            }

            return artificialParent.Expression.Clone();
        }

        bool IsDegenerateQuery(QueryExpression query)
        {
            if (query == null)
                return false;
            var lastClause = query.Clauses.LastOrDefault();
            return !(lastClause is QuerySelectClause || lastClause is QueryGroupClause);
        }

        void DecompileQueries(AstNode node)
        {
            QueryExpression query = DecompileQuery(node as InvocationExpression);
            if (query != null)
                node.ReplaceWith(query);
        }

        Expression ExtractQuery(MemberReferenceExpression mre)
        {
            var inExpression = mre.Target.Clone();
            var inContent = DecompileQuery(inExpression as InvocationExpression) ?? inExpression;
            return inContent;
        }

        QueryExpression DecompileQuery(InvocationExpression invocation)
        {
            if (invocation == null)
                return null;
            if (!(invocation.Target is MemberReferenceExpression mre))
                return null;

            switch (mre.MemberName) {
                case "Select":
                    {
                        if (invocation.Arguments.Count != 1)
                            return null;
                        string parameterName;
                        Expression body;
                        if (MatchSimpleLambda(invocation.Arguments.Single(), out parameterName, out body)) {
                            QueryExpression query = new QueryExpression();
                            query.Clauses.Add(new QueryFromClause { Identifier = parameterName, Expression = ExtractQuery(mre) });
                            query.Clauses.Add(new QuerySelectClause { Expression = body.Detach() });
                            return query;
                        }
                        return null;
                    }
                case "Cast":
                    {
                        if (invocation.Arguments.Count == 0 && mre.TypeArguments.Count == 1) {
                            var typeArgument = mre.TypeArguments.First();

                            QueryExpression query = new QueryExpression();
                            string varName = GenerateVariableName();
                            query.Clauses.Add(new QueryFromClause {
                                Identifier = varName,
                                Expression = ExtractQuery(mre),
                                Type = typeArgument.Detach()
                            });
                            return query;

                        }
                        return null;
                    }
                case "GroupBy":
                    {
                        if (invocation.Arguments.Count == 2) {
                            string parameterName1, parameterName2;
                            Expression keySelector, elementSelector;
                            if (MatchSimpleLambda(invocation.Arguments.ElementAt(0), out parameterName1, out keySelector)
                                && MatchSimpleLambda(invocation.Arguments.ElementAt(1), out parameterName2, out elementSelector)
                                && parameterName1 == parameterName2) {
                                QueryExpression query = new QueryExpression();
                                query.Clauses.Add(new QueryFromClause { Identifier = parameterName1, Expression = ExtractQuery(mre) });
                                query.Clauses.Add(new QueryGroupClause { Projection = elementSelector.Detach(), Key = keySelector.Detach() });
                                return query;
                            }
                        } else if (invocation.Arguments.Count == 1) {
                            string parameterName;
                            Expression keySelector;
                            if (MatchSimpleLambda(invocation.Arguments.Single(), out parameterName, out keySelector)) {
                                QueryExpression query = new QueryExpression();
                                query.Clauses.Add(new QueryFromClause { Identifier = parameterName, Expression = ExtractQuery(mre) });
                                query.Clauses.Add(new QueryGroupClause {
                                    Projection = new IdentifierExpression(parameterName),
                                    Key = keySelector.Detach()
                                });
                                return query;
                            }
                        }
                        return null;
                    }
                case "SelectMany":
                    {
                        if (invocation.Arguments.Count != 2)
                            return null;
                        string parameterName;
                        Expression collectionSelector;
                        if (!MatchSimpleLambda(invocation.Arguments.ElementAt(0), out parameterName, out collectionSelector))
                            return null;
                        if (invocation.Arguments.ElementAt(1) is LambdaExpression lambda && lambda.Parameters.Count == 2 && lambda.Body is Expression)
                        {
                            ParameterDeclaration p1 = lambda.Parameters.ElementAt(0);
                            ParameterDeclaration p2 = lambda.Parameters.ElementAt(1);
                            QueryExpression query = new QueryExpression();
                            query.Clauses.Add(new QueryFromClause { Identifier = p1.Name, Expression = ExtractQuery(mre) });
                            query.Clauses.Add(new QueryFromClause { Identifier = p2.Name, Expression = collectionSelector.Detach() });
                            query.Clauses.Add(new QuerySelectClause { Expression = ((Expression)lambda.Body).Detach() });
                            return query;
                        }
                        return null;
                    }
                case "Where":
                    {
                        if (invocation.Arguments.Count != 1)
                            return null;
                        string parameterName;
                        Expression body;
                        if (MatchSimpleLambda(invocation.Arguments.Single(), out parameterName, out body)) {
                            QueryExpression query = new QueryExpression();
                            query.Clauses.Add(new QueryFromClause { Identifier = parameterName, Expression = ExtractQuery(mre) });
                            query.Clauses.Add(new QueryWhereClause { Condition = body.Detach() });
                            return query;
                        }
                        return null;
                    }
                case "OrderBy":
                case "OrderByDescending":
                case "ThenBy":
                case "ThenByDescending":
                    {
                        if (invocation.Arguments.Count != 1)
                            return null;
                        string parameterName;
                        Expression orderExpression;
                        if (MatchSimpleLambda(invocation.Arguments.Single(), out parameterName, out orderExpression)) {
                            if (ValidateThenByChain(invocation, parameterName)) {
                                QueryOrderClause orderClause = new QueryOrderClause();
                                InvocationExpression tmp = invocation;
                                while (mre.MemberName == "ThenBy" || mre.MemberName == "ThenByDescending") {
                                    // insert new ordering at beginning
                                    orderClause.Orderings.InsertAfter(
                                        null, new QueryOrdering {
                                        Expression = orderExpression.Detach(),
                                        Direction = (mre.MemberName == "ThenBy" ? QueryOrderingDirection.None : QueryOrderingDirection.Descending)
                                    });

                                    tmp = (InvocationExpression)mre.Target;
                                    mre = (MemberReferenceExpression)tmp.Target;
                                    MatchSimpleLambda(tmp.Arguments.Single(), out parameterName, out orderExpression);
                                }
                                // insert new ordering at beginning
                                orderClause.Orderings.InsertAfter(
                                    null, new QueryOrdering {
                                    Expression = orderExpression.Detach(),
                                    Direction = (mre.MemberName == "OrderBy" ? QueryOrderingDirection.None : QueryOrderingDirection.Descending)
                                });

                                QueryExpression query = new QueryExpression();
                                query.Clauses.Add(new QueryFromClause { Identifier = parameterName, Expression = ExtractQuery(mre) });
                                query.Clauses.Add(orderClause);
                                return query;
                            }
                        }
                        return null;
                    }
                case "Join":
                case "GroupJoin":
                    {
                        if (invocation.Arguments.Count != 4)
                            return null;
                        Expression source1 = mre.Target;
                        Expression source2 = invocation.Arguments.ElementAt(0);
                        string elementName1, elementName2;
                        Expression key1, key2;
                        if (!MatchSimpleLambda(invocation.Arguments.ElementAt(1), out elementName1, out key1))
                            return null;
                        if (!MatchSimpleLambda(invocation.Arguments.ElementAt(2), out elementName2, out key2))
                            return null;
                        if (invocation.Arguments.ElementAt(3) is LambdaExpression lambda && lambda.Parameters.Count == 2 && lambda.Body is Expression)
                        {
                            ParameterDeclaration p1 = lambda.Parameters.ElementAt(0);
                            ParameterDeclaration p2 = lambda.Parameters.ElementAt(1);
                            QueryExpression query = new QueryExpression();
                            query.Clauses.Add(new QueryFromClause { Identifier = elementName1, Expression = source1.Detach() });
                            QueryJoinClause joinClause = new QueryJoinClause();

                            joinClause.JoinIdentifier = elementName2;    // join elementName2
                            joinClause.InExpression = source2.Detach();  // in source2

                            Match castMatch = castPattern.Match(source2);
                            if (castMatch.Success)
                            {
                                Expression target = castMatch.Get<Expression>("inExpr").Single().Detach();
                                joinClause.Type = castMatch.Get<AstType>("targetType").Single().Detach();
                                joinClause.InExpression = target;
                            }

                            joinClause.OnExpression = key1.Detach();     // on key1
                            joinClause.EqualsExpression = key2.Detach(); // equals key2
                            if (mre.MemberName == "GroupJoin")
                            {
                                joinClause.IntoIdentifier = p2.Name; // into p2.Name
                            }
                            query.Clauses.Add(joinClause);
                            Expression resultExpr = ((Expression)lambda.Body).Detach();
                            if (p1.Name != elementName1)
                            {
                                foreach (var identifier in resultExpr.Descendants.OfType<Identifier>().Where(id => id.Name == p1.Name))
                                {
                                    identifier.Name = elementName1;
                                }
                            }
                            if (p2.Name != elementName2 && mre.MemberName != "GroupJoin")
                            {
                                foreach (var identifier in resultExpr.Descendants.OfType<Identifier>().Where(id => id.Name == p2.Name))
                                {
                                    identifier.Name = elementName2;
                                }
                            }
                            query.Clauses.Add(new QuerySelectClause { Expression = resultExpr });
                            return query;
                        }
                        return null;
                    }
                default:
                    return null;
            }
        }

        int id = 1;
        string GenerateVariableName()
        {
            return "<>" + id++;
        }

        /// <summary>
        /// Ensure that all ThenBy's are correct, and that the list of ThenBy's is terminated by an 'OrderBy' invocation.
        /// </summary>
        bool ValidateThenByChain(InvocationExpression invocation, string expectedParameterName)
        {
            if (invocation == null || invocation.Arguments.Count != 1)
                return false;
            if (!(invocation.Target is MemberReferenceExpression mre))
                return false;
            string parameterName;
            Expression body;
            if (!MatchSimpleLambda(invocation.Arguments.Single(), out parameterName, out body))
                return false;
            if (parameterName != expectedParameterName)
                return false;

            if (mre.MemberName == "OrderBy" || mre.MemberName == "OrderByDescending")
                return true;
            else if (mre.MemberName == "ThenBy" || mre.MemberName == "ThenByDescending")
                return ValidateThenByChain(mre.Target as InvocationExpression, expectedParameterName);
            else
                return false;
        }

        /// <summary>Matches simple lambdas of the form "a => b"</summary>
        bool MatchSimpleLambda(Expression expr, out string parameterName, out Expression body)
        {
            if (expr is LambdaExpression lambda && lambda.Parameters.Count == 1 && lambda.Body is Expression)
            {
                ParameterDeclaration p = lambda.Parameters.Single();
                if (p.ParameterModifier == ParameterModifier.None)
                {
                    parameterName = p.Name;
                    body = (Expression)lambda.Body;
                    return true;
                }
            }
            parameterName = null;
            body = null;
            return false;
        }
    }
}
