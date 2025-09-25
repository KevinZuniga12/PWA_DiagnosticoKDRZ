<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Kevin Zúñiga</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: #ffffff;
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        .error-container {
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #dee2e6;
            padding: 3rem;
            text-align: center;
            max-width: 500px;
        }
        .error-icon {
            font-size: 4rem;
            color: #dc3545;
            margin-bottom: 1rem;
        }
        .btn-home {
            background: #007bff;
            border: none;
            color: white;
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin-top: 1rem;
        }
        .btn-home:hover {
            background: #0056b3;
            color: white;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">
            <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h1>¡Oops! Algo salió mal</h1>
        <p class="text-muted">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente o regresa al inicio.
        </p>
        <div class="mt-4">
            <strong>Código de error:</strong> <%= request.getAttribute("javax.servlet.error.status_code") %>
        </div>
        <a href="generaciones" class="btn-home">
            <i class="fas fa-home me-2"></i>Volver al Inicio
        </a>
    </div>
</body>
</html>