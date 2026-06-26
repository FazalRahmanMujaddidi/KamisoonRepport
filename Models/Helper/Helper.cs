using System.Globalization;

public static class DateHelper
{
    public static string ToShamsi(DateTime date)
    {
        PersianCalendar pc = new PersianCalendar();

        return $"{pc.GetYear(date)}/{pc.GetMonth(date):00}/{pc.GetDayOfMonth(date):00}";
    }
}