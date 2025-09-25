package com.nomenclaturas.servlet;

public class Generacion {
    private int id;
    private String nombre;
    private String peMes;
    private int peAno;
    
    public Generacion(int id, String nombre, String peMes, int peAno) {
        this.id = id;
        this.nombre = nombre;
        this.peMes = peMes;
        this.peAno = peAno;
    }
    
    // Getters y Setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getPeMes() {
        return peMes;
    }
    
    public void setPeMes(String peMes) {
        this.peMes = peMes;
    }
    
    public int getPeAno() {
        return peAno;
    }
    
    public void setPeAno(int peAno) {
        this.peAno = peAno;
    }
}