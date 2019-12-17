using System;

namespace Datinapp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        public User User { get; set; } // this how to tell about the relationship btween photos and users
                                        // and when we delete a user all his photos are deleted

        public int UserId { get; set; }
    }
}