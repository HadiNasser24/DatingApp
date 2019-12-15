using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Datinapp.API.Data;
using Datinapp.API.Dtos;
using Datinapp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Datinapp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo,IMapper mapper){
            _repo=repo;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(){
            var users= await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id){
            var user= await _repo.GetUser(id);
            var userToReturn=_mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpDelete]
        public IActionResult DeleteUser(User user){
             _repo.Delete(user);
            return Ok("User Deleted");

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserForUpdateDto userForUpdateDto){
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){ //check if the id is the same as in the token
                return Unauthorized();
            }

            var userFromRepo= await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto,userFromRepo); //map the values updated into the user

            if(await _repo.SaveAll()){
                return NoContent();
            }
            throw new Exception($"updating user {id} failed on save");
        }
    }
}