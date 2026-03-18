using Arena.AI.Core.Models;

namespace Arena.AI.Core;

public static class NumberLetterConverter
{
    const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static char GetLetter(int number)
    {
        if(number >= 1 && number <=28)
        {
            return UppercaseLetters[number - 1];
        }

        throw new ArgumentOutOfRangeException();
    }

    public static int GetNumber(char letter)
    {
        var index = UppercaseLetters.IndexOf(letter);
        if(index >= 0)
        {
            return index + 1;
        }

        throw new ArgumentOutOfRangeException();
    }

    public static bool TryParseDestination(string destination, out (int, int) dest)
    {
        if(destination.Length > 1 && UppercaseLetters.Contains(destination[0]) && int.TryParse(destination[1..], out int y))
        {
            dest = (GetNumber(destination[0]), y);
            return true;
        }

        dest = (0, 0);
        return false;
    }

    public static string GetDestination(int x, int y)
    {
        try
        {
            return $"{NumberLetterConverter.GetLetter(x)}{y}";
        }
        catch(Exception)
        {
            throw;
        }
    }
}
