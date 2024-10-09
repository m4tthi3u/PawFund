﻿using PawFund.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Interfaces.Services
{
    public interface IShelterService
    {
        Task<IEnumerable<Shelter>> GetAllSheltersAsync();
        Task<Shelter> GetShelterByIdAsync(int id);
        Task AddShelterAsync(Shelter shelter);
        Task UpdateShelterAsync(Shelter shelter);
        Task DeleteShelterAsync(int id);
    }
}
