using System;
using System.Security.Cryptography;

namespace FormLists.API.Helpers
{
    public static class PasswordHelper
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 100000;

        // Bu metot, yeni şifreler oluşturmak veya eski şifreleri güncellemek için kullanılır.
        // Biz login işleminde bunu kullanmayacağız, sadece VerifyPassword'u kullanacağız.
        // Ama gelecekte lazım olacağı için burada durması çok iyi.
        public static string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);

            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256))
            {
                byte[] hash = pbkdf2.GetBytes(HashSize);
                byte[] hashBytes = new byte[SaltSize + HashSize];

                Buffer.BlockCopy(salt, 0, hashBytes, 0, SaltSize);
                Buffer.BlockCopy(hash, 0, hashBytes, SaltSize, HashSize);

                return Convert.ToBase64String(hashBytes);
            }
        }

        // Parola doğrulama metodu. Bizim için en önemli kısım bu.
        public static bool VerifyPassword(string password, string storedHash)
        {
            try
            {
                byte[] hashBytes = Convert.FromBase64String(storedHash);
                byte[] salt = new byte[SaltSize];

                Buffer.BlockCopy(hashBytes, 0, salt, 0, SaltSize);

                using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256))
                {
                    byte[] hash = pbkdf2.GetBytes(HashSize);

                    // Karşılaştırma
                    for (int i = 0; i < HashSize; i++)
                    {
                        if (hashBytes[i + SaltSize] != hash[i])
                        {
                            return false; // Eşleşmiyorsa hemen false dön
                        }
                    }
                }
                return true; // Döngü bittiyse ve hiç fark bulunmadıysa, şifre doğrudur.
            }
            catch
            {
                // Eğer storedHash geçersiz bir Base64 ise veya formatı bozuksa,
                // bir hata fırlatır. Bunu yakalayıp false dönmek en güvenlisidir.
                return false;
            }
        }
    }
}