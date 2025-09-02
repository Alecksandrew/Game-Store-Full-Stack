namespace GameStoreAPI.Shared
{
    public class Result<T>
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public T? Value { get; }
        public Error Error { get; }

        private Result(T? value)
        {
            IsSuccess = true;
            Value = value;
            Error = default;
        }

        private Result(Error error)
        {
            IsSuccess = false;
            Value = default;
            Error = error;
        }

        public static Result<T> Ok(T? value) => new(value);

        public static Result<T> Fail(Error error) => new(error);
    
    }
}
