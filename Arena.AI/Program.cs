using Arena.AI.Services;
using Arena.AI.Core;
using Arena.AI.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

// Battle result persistence pipeline
builder.Services.AddSingleton<BattleResultBuffer>();
builder.Services.AddSingleton<DuckDbBattleRepository>();
builder.Services.AddHostedService<BattleResultsFlushService>();

var app = builder.Build();

ActiveBattlesManager.Init(app.Services);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ExternalPlayerHub>("/play");

app.Run();
