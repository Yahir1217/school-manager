# Imagen base con SDK para build y hot reload
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Instalamos cliente de MySQL para el script
RUN apt-get update && apt-get install -y default-mysql-client

# Copiamos el .csproj y restauramos dependencias
COPY backend.csproj . 
RUN dotnet restore

# Copiamos todo el código
COPY . .

# Copiamos el script de espera
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Exponemos puerto
EXPOSE 5239

# ENTRYPOINT final: esperamos MySQL y lanzamos dotnet watch run
ENTRYPOINT ["/wait-for-mysql.sh", "mysql", "dotnet", "watch", "run", "--urls", "http://0.0.0.0:5239"]
