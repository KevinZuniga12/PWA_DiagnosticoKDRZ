<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nomenclaturas - Kevin Zúñiga</title>
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
        .add-btn {
            background: #28a745;
            border: none;
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 5px;
            font-size: 1rem;
        }
        .add-btn:hover {
            background: #218838;
        }
        .modify-btn {
            background: #ffc107;
            border: none;
            color: #333;
            width: 30px;
            height: 30px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 12px;
        }
        .modify-btn:hover {
            background: #e0a800;
        }
        .generation-info {
            background: #f8f9fa;
            border-radius: 5px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-left: 3px solid #007bff;
        }
        .table th {
            background: #007bff;
            color: white;
            border: none;
            font-weight: 500;
        }
        .table td {
            vertical-align: middle;
        }
        h1 {
            color: #495057;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="generaciones" class="back-btn">
            <i class="fas fa-arrow-left me-2"></i>Volver a Generaciones
        </a>
        
        <div class="main-container">
            <div class="text-center mb-4">
                <h1><i class="fas fa-tags me-3"></i>Nomenclatura</h1>
            </div>
            
            <div class="generation-info">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <h4><i class="fas fa-hashtag me-2"></i>Generación: ${generacion.id}</h4>
                    </div>
                    <div class="col-md-8 text-md-end">
                        <div class="d-flex justify-content-md-end gap-4">
                            <div>
                                <strong><i class="fas fa-calendar-day me-1"></i>PeMes:</strong> 
                                <span class="text-primary">${generacion.peMes}</span>
                            </div>
                            <div>
                                <strong><i class="fas fa-calendar me-1"></i>PeAño:</strong> 
                                <span class="text-primary">${generacion.peAno}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5><i class="fas fa-table me-2"></i>Lista de Nomenclaturas</h5>
                <button type="button" class="add-btn" data-bs-toggle="modal" data-bs-target="#agregarModal" title="Agregar Nomenclatura">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th style="width: 10%;">#</th>
                            <th style="width: 30%;">V.Numérico</th>
                            <th style="width: 45%;">V.Letra</th>
                            <th style="width: 15%;">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="nomenclatura" items="${nomenclaturas}" varStatus="status">
                            <tr>
                                <td><strong>${status.index + 1}</strong></td>
                                <td>
                                    <span class="badge bg-primary fs-6">${nomenclatura.valorNumerico}</span>
                                </td>
                                <td>
                                    <span class="badge bg-secondary fs-6">${nomenclatura.valorLetra}</span>
                                </td>
                                <td>
                                    <button type="button" class="modify-btn" 
                                            onclick="abrirModalModificar(${nomenclatura.id}, ${nomenclatura.valorNumerico}, '${nomenclatura.valorLetra}')"
                                            title="Modificar">
                                        M
                                    </button>
                                </td>
                            </tr>
                        </c:forEach>
                        <c:if test="${empty nomenclaturas}">
                            <tr>
                                <td colspan="4" class="text-center text-muted py-4">
                                    <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                                    No hay nomenclaturas para esta generación
                                </td>
                            </tr>
                        </c:if>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- Modal Agregar -->
    <div class="modal fade" id="agregarModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-plus-circle me-2"></i>Agregar Nomenclatura
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form method="post" action="generaciones">
                    <div class="modal-body">
                        <input type="hidden" name="action" value="agregar">
                        <input type="hidden" name="generacionId" value="${generacion.id}">
                        
                        <div class="mb-3">
                            <label for="valorNumerico" class="form-label">
                                <i class="fas fa-hashtag me-1"></i>Valor Numérico
                            </label>
                            <input type="number" class="form-control" id="valorNumerico" name="valorNumerico" required min="1">
                        </div>
                        
                        <div class="mb-3">
                            <label for="valorLetra" class="form-label">
                                <i class="fas fa-font me-1"></i>Valor Letra
                            </label>
                            <input type="text" class="form-control" id="valorLetra" name="valorLetra" maxlength="5" required pattern="[A-Za-z]+">
                            <div class="form-text">Solo letras, máximo 5 caracteres</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i>Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-1"></i>Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Modal Modificar -->
    <div class="modal fade" id="modificarModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-edit me-2"></i>Modificar Nomenclatura
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form method="post" action="generaciones">
                    <div class="modal-body">
                        <input type="hidden" name="action" value="modificar">
                        <input type="hidden" name="generacionId" value="${generacion.id}">
                        <input type="hidden" name="nomenclaturaId" id="modificarId">
                        
                        <div class="mb-3">
                            <label for="modificarValorNumerico" class="form-label">
                                <i class="fas fa-hashtag me-1"></i>Valor Numérico
                            </label>
                            <input type="number" class="form-control" id="modificarValorNumerico" name="valorNumerico" required min="1">
                        </div>
                        
                        <div class="mb-3">
                            <label for="modificarValorLetra" class="form-label">
                                <i class="fas fa-font me-1"></i>Valor Letra
                            </label>
                            <input type="text" class="form-control" id="modificarValorLetra" name="valorLetra" maxlength="5" required pattern="[A-Za-z]+">
                            <div class="form-text">Solo letras, máximo 5 caracteres</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i>Cancelar
                        </button>
                        <button type="submit" class="btn btn-warning">
                            <i class="fas fa-save me-1"></i>Modificar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function abrirModalModificar(id, valorNumerico, valorLetra) {
            document.getElementById('modificarId').value = id;
            document.getElementById('modificarValorNumerico').value = valorNumerico;
            document.getElementById('modificarValorLetra').value = valorLetra;
            
            var modal = new bootstrap.Modal(document.getElementById('modificarModal'));
            modal.show();
        }
    </script>
</body>
</html>