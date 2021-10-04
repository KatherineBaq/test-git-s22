/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import java.sql.SQLException;

/**
 *
 * @author apigr
 */
public class testConexionBD {
    
    public static void main(String[] args) throws SQLException {
        //psvm para generarlo automaticamente
        
        Contacto c = new Contacto();
        Contacto c_r = new Contacto();
        
        c_r = c.obtenerContacto(1010110101);
        if (c_r != null){
            System.out.println("Nombre: " + c_r.getNombre());
        } else {
            System.out.println("No se encontró el usuario");
        }
    }
}
