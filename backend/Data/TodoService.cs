using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Data
{
    public class TodoService
    {
        private readonly IMongoCollection<Todo> _todo;

        public TodoService(IOptions<TodoDatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            _todo = mongoClient.GetDatabase(options.Value.DatabaseName)
                .GetCollection<Todo>(options.Value.TodoCollectionName);
        }

        public async Task<List<Todo>> Get() =>
            await _todo.Find(_ => true).ToListAsync();

        public async Task<Todo> Get(string id) =>
            await _todo.Find(t => t.Id == id).FirstOrDefaultAsync();

        public async Task Create(Todo newTodo) =>
            await _todo.InsertOneAsync(newTodo);

        public async Task Update(string id, Todo updateTodo) =>
            await _todo.ReplaceOneAsync(t => t.Id == id, updateTodo);

        public async Task Remove(string id) =>
            await _todo.DeleteOneAsync(t => t.Id == id);
    }
}
