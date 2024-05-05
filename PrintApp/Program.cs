using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddEdunovaSwaggerGen();
builder.Services.AddEdunovaCORS();

//builder.Services.AddCors(opcije =>
//{
//    opcije.AddPolicy("CorsPolicy",
//        builder =>
//        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
//        );
//});

builder.Services.AddDbContext<PrintAppContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("PrintAppContext"));
});

// SECURITY

// https://www.youtube.com/watch?v=mgeuh8k3I4g&ab_channel=NickChapsas
builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("moj tajni kljuc koji je najbolji kljuc na svijetu i najljepsi")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = false
    };
});

builder.Services.AddAuthorization();


// END SECURITY

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(o =>
    {
        o.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
        o.EnableTryItOutByDefault();
    });
//}

app.UseHttpsRedirection();

// SECURITY
app.UseAuthentication();
app.UseAuthorization();
// ENDSECURITY

app.MapControllers();

app.UseCors("CorsPolicy");

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();
