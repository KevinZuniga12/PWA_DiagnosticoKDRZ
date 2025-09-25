<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Nomenclaturas - Kevin Zúñiga</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: #ffffff;
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
        }
        .main-container {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 2rem;
        }
        .generation-card {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: all 0.2s ease;
            cursor: pointer;
            background: #fafafa;
        }
        .generation-card:hover {
            border-color: #007bff;
            box-shadow: 0 2px 8px rgba(0,123,255,0.15);
            background: #ffffff;
        }
        .back-btn {
            background: #6c757d;
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 2rem;
            font-size: 14px;
        }
        .back-btn:hover {
            background: #5a6268;
            color: white;
            text-decoration: none;
        }
        .generation-number {
            background: #007bff;
            color: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0 auto 1rem auto;
        }
        h1 {
            color: #495057;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        
        <div class="main-container">
            <div class="text-center mb-4">
                <h1><i class="fas fa-list-alt me-3"></i>Generaciones</h1>
                <p class="text-muted">Selecciona una generación para ver sus nomenclaturas</p>
            </div>
            
            <div class="row">
                <c:forEach var="generacion" items="${generaciones}">
                    <div class="col-md-6 col-lg-4">
                        <div class="generation-card text-center" onclick="window.location.href='generaciones?action=ver&generacionId=${generacion.id}'">
                            <div class="generation-number">
                                ${generacion.id}
                            </div>
                            <h5 class="text-primary mb-3">${generacion.nombre} Generación</h5>
                            <div class="row">
                                <div class="col-6">
                                    <div class="text-muted small">Mes</div>
                                    <div class="fw-bold">${generacion.peMes}</div>
                                </div>
                                <div class="col-6">
                                    <div class="text-muted small">Año</div>
                                    <div class="fw-bold">${generacion.peAno}</div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <small class="text-muted">
                                    <i class="fas fa-mouse-pointer me-1"></i>Clic para ver nomenclaturas
                                </small>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
            
            <c:if test="${empty generaciones}">
                <div class="text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        No hay generaciones disponibles en este momento.
                    </div>
                </div>
            </c:if>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>