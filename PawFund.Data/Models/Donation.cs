namespace PawFund.Data.Models
{
    public class Donation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? ShelterId { get; set; }

        public int PetId { get; set; }
        public decimal Amount { get; set; }
        public DateTime DonationDate { get; set; }
        public DonationStatus Status { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }

    public enum DonationStatus
    {
        Pending,
        Completed,
        Failed,
        Refunded
    }
    
    public enum PaymentMethod
    {
        CreditCard,
        DebitCard,
        BankTransfer,
        PayPal
    }
}