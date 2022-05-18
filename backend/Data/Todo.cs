namespace backend.Data;
using MongoDB.Bson.Serialization.Attributes;
using backend.Data;


public class Todo
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool Completed { get; set; }
}
