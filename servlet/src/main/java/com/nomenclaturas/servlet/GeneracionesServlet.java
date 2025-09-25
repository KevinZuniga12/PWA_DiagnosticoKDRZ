package com.nomenclaturas.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/generaciones")
public class GeneracionesServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Lista estática para simular base de datos
    private static List<Generacion> generaciones = new ArrayList<>();
    private static List<Nomenclatura> nomenclaturas = new ArrayList<>();
    
    static {
        // Datos iniciales
        generaciones.add(new Generacion(1, "Primera", "Enero", 2020));
        generaciones.add(new Generacion(2, "Segunda", "Marzo", 2021));
        generaciones.add(new Generacion(3, "Tercera", "Junio", 2022));
        generaciones.add(new Generacion(4, "Cuarta", "Septiembre", 2023));
        generaciones.add(new Generacion(5, "Quinta", "Diciembre", 2024));
        
        // Nomenclaturas de ejemplo
        nomenclaturas.add(new Nomenclatura(1, 1, 5, "NA"));
        nomenclaturas.add(new Nomenclatura(2, 1, 8, "SA"));
        nomenclaturas.add(new Nomenclatura(3, 1, 9, "DE"));
        nomenclaturas.add(new Nomenclatura(4, 1, 10, "AU"));
        nomenclaturas.add(new Nomenclatura(5, 2, 15, "BE"));
        nomenclaturas.add(new Nomenclatura(6, 2, 20, "GH"));
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        String generacionIdParam = request.getParameter("generacionId");
        
        if ("ver".equals(action) && generacionIdParam != null) {
            int generacionId = Integer.parseInt(generacionIdParam);
            Generacion generacion = buscarGeneracion(generacionId);
            List<Nomenclatura> nomenclaturasGen = buscarNomenclaturasPorGeneracion(generacionId);
            
            request.setAttribute("generacion", generacion);
            request.setAttribute("nomenclaturas", nomenclaturasGen);
            request.getRequestDispatcher("/WEB-INF/jsp/nomenclaturas.jsp").forward(request, response);
        } else {
            request.setAttribute("generaciones", generaciones);
            request.getRequestDispatcher("/WEB-INF/jsp/generaciones.jsp").forward(request, response);
        }
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        
        if ("agregar".equals(action)) {
            int generacionId = Integer.parseInt(request.getParameter("generacionId"));
            int valorNumerico = Integer.parseInt(request.getParameter("valorNumerico"));
            String valorLetra = request.getParameter("valorLetra");
            
            int nuevoId = nomenclaturas.size() + 1;
            nomenclaturas.add(new Nomenclatura(nuevoId, generacionId, valorNumerico, valorLetra));
            
            response.sendRedirect("generaciones?action=ver&generacionId=" + generacionId);
        } else if ("modificar".equals(action)) {
            int nomenclaturaId = Integer.parseInt(request.getParameter("nomenclaturaId"));
            int generacionId = Integer.parseInt(request.getParameter("generacionId"));
            int valorNumerico = Integer.parseInt(request.getParameter("valorNumerico"));
            String valorLetra = request.getParameter("valorLetra");
            
            // Buscar y modificar la nomenclatura
            for (Nomenclatura n : nomenclaturas) {
                if (n.getId() == nomenclaturaId) {
                    n.setValorNumerico(valorNumerico);
                    n.setValorLetra(valorLetra);
                    break;
                }
            }
            
            response.sendRedirect("generaciones?action=ver&generacionId=" + generacionId);
        }
    }
    
    private Generacion buscarGeneracion(int id) {
        return generaciones.stream()
                .filter(g -> g.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    private List<Nomenclatura> buscarNomenclaturasPorGeneracion(int generacionId) {
        List<Nomenclatura> resultado = new ArrayList<>();
        for (Nomenclatura n : nomenclaturas) {
            if (n.getGeneracionId() == generacionId) {
                resultado.add(n);
            }
        }
        return resultado;
    }
}