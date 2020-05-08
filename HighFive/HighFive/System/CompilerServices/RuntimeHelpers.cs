using System.ComponentModel;

namespace System.Runtime.CompilerServices
{
    [HighFive.Convention(Member = HighFive.ConventionMember.Field | HighFive.ConventionMember.Method, Notation = HighFive.Notation.CamelCase)]
    [HighFive.External]
    public static class RuntimeHelpers
    {
        [EditorBrowsable(EditorBrowsableState.Never)]
        public static extern void InitializeArray(Array array, RuntimeFieldHandle handle);

        [EditorBrowsable(EditorBrowsableState.Never)]
        public static extern int OffsetToStringData
        {
            get;
        }

        [HighFive.Template("HighFive.getHashCode({obj})")]
        public static extern int GetHashCode(object obj);

        [HighFive.Template("{type}.$staticInit && {type}.$staticInit()")]
        public static extern void RunClassConstructor(Type type);
    }
}