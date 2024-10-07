using PawFund.API.DTOs;

namespace PawFund.Core.Interfaces
{
    public interface IPetService
    {
        IEnumerable<PetDto> GetAvailablePets(string breed, int age);
        PetDto GetPetById(int id);
        void AddPet(PetDto petDto);
        void UpdatePet(int id, PetDto petDto);
        void DeletePet(int id);
        void MarkAsAdopted(int id, string adopterName);
    }
}
