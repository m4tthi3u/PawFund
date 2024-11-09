namespace PawFund.Data.Models
{

    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        
        private DateTimeOffset _date;
        public DateTimeOffset Date
        {
            get => _date;
            set => _date = value.ToUniversalTime(); // due to postgresql nature of adding datetime, it is certainly needed this to solve the problem when adding.
        }
        public string Location { get; set; }
        public int ShelterId { get; set; }
    }
}