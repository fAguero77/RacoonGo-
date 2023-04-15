using RacoonGo.Services;
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("PolicyCors",
//        policy =>
//        {
//            policy.WithOrigins("https://localhost:4200")
//                                .AllowAnyHeader()
//                                .AllowAnyMethod()
//                                .AllowCredentials();
//        });
//});

//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(builder => builder
//        .AllowAnyOrigin()
//        .AllowAnyMethod()
//        .AllowAnyHeader());
//});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IGeodecodeService, GeodcodeService>();
builder.Services.AddSingleton<ISearchService, SearchService>();

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder
    .WithOrigins("http://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();