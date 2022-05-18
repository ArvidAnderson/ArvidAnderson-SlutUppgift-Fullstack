using backend.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {});
builder.Services.Configure<TodoDatabaseSettings>(builder.Configuration.GetSection("TodoDatabase"));
builder.Services.AddSingleton<TodoService>();
var app = builder.Build();
app.UseCors(builder => builder
 .AllowAnyOrigin()
 .AllowAnyMethod()
 .AllowAnyHeader());

app.MapGet("/", async (TodoService todoService) => await todoService.Get());

app.MapGet("/{id}", async (TodoService todoService, string id) =>
{
    var todo = await todoService.Get(id);
    return todo is null ? Results.NotFound() : Results.Ok(todo);
});

app.MapPost("/", async (TodoService todoService, Todo todo) =>
{
    await todoService.Create(todo);
    return Results.Ok();
});

app.MapPut("/{id}", async (TodoService todoService, string id, Todo updatedTodo) => {
    var todo = await todoService.Get(id);
    if (todo is null) return Results.NotFound();

    updatedTodo.Id = todo.Id;
    await todoService.Update(id, updatedTodo);

    return Results.NoContent();
});

app.MapDelete("/{id}", async (TodoService todoService, string id) =>
{
    var todo = await todoService.Get(id);
    if (todo is null) return Results.NotFound();

    await todoService.Remove(todo.Id);

    return Results.NoContent();
});

app.Run();
