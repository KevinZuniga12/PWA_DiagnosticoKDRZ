package com.nomenclaturas.servlet;

public class Nomenclatura {
    private int id;
    private int generacionId;
    private int valorNumerico;
    private String valorLetra;
    
    public Nomenclatura(int id, int generacionId, int valorNumerico, String valorLetra) {
        this.id = id;
        this.generacionId = generacionId;
        this.valorNumerico = valorNumerico;
        this.valorLetra = valorLetra;
    }
    
    // Getters y Setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public int getGeneracionId() {
        return generacionId;
    }
    
    public void setGeneracionId(int generacionId) {
        this.generacionId = generacionId;
    }
    
    public int getValorNumerico() {
        return valorNumerico;
    }
    
    public void setValorNumerico(int valorNumerico) {
        this.valorNumerico = valorNumerico;
    }
    
    public String getValorLetra() {
        return valorLetra;
    }
    
    public void setValorLetra(String valorLetra) {
        this.valorLetra = valorLetra;
    }
}