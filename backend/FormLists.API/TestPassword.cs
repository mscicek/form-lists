using FormLists.API.Helpers;

namespace FormLists.API
{
    public class TestPassword
    {
        public static void Main()
        {
            string password = "1234";
            string hashedPassword = PasswordHelper.HashPassword(password.ToUpper());
            
            Console.WriteLine($"Şifre: {password}");
            Console.WriteLine($"Hash: {hashedPassword}");
            
            // Test doğrulama
            bool isValid = PasswordHelper.VerifyPassword(password.ToUpper(), hashedPassword);
            Console.WriteLine($"Doğrulama: {isValid}");
        }
    }
} 