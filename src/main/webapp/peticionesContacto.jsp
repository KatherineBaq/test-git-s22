<%-- 
    Document   : peticionesContacto
    Created on : Sep 22, 2021, 7:13:31 PM
    Author     : apigr
--%>

<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.List"%>
<%@page import="logica.Contacto"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<% 
String respuesta = "{";
String proceso = request.getParameter("proceso"); //request HTTP 
//a los request se les puede pasar parámetros
//se va a validar el tipo de proceso
Contacto c = new Contacto(); //se piden los parámetros del contacto que se quiere guardar
switch(proceso){
    case "guardarContacto":
        System.out.println("Guardar Contacto");
        c.setIdentificacion(Integer.parseInt(request.getParameter("identificacion"))); //a este hay que convertirlo de entero a string
        c.setNombre(request.getParameter("nombre"));
        c.setApellido(request.getParameter("apellido"));
        c.setGenero(request.getParameter("genero"));
        c.setTipoIdentificacion(request.getParameter("tipoIdentificacion"));
        c.setTelefono(request.getParameter("telefono"));
        c.setDireccion(request.getParameter("direccion"));
        c.setCorreo(request.getParameter("correo"));

        if(c.guardarContacto()){
            //si guarda bien el contacto, se concatena otros datos para el json
            respuesta += "\"" + proceso + "\": true";  // el \ se usa para concatenar en json indicando que se hizo el proceso (true)
        } else{
            respuesta += "\"" + proceso + "\": false";  // el \ se usa para concatenar en json indicando que NO se hizo el proceso (false)
        }

        break;
        
    case "actualizarContacto":
        
        System.out.println("Actualizar Contacto");
        c.setIdentificacion(Integer.parseInt(request.getParameter("identificacion"))); //a este hay que convertirlo de entero a string
        c.setNombre(request.getParameter("nombre"));
        c.setApellido(request.getParameter("apellido"));
        c.setGenero(request.getParameter("genero"));
        c.setTipoIdentificacion(request.getParameter("tipoIdentificacion"));
        c.setTelefono(request.getParameter("telefono"));
        c.setDireccion(request.getParameter("direccion"));
        c.setCorreo(request.getParameter("correo"));

        if(c.actualizarContacto()){
            //si guarda bien el contacto, se concatena otros datos para el json
            respuesta += "\"" + proceso + "\": true";  // el \ se usa para concatenar en json indicando que se hizo el proceso (true)
        } else{
            respuesta += "\"" + proceso + "\": false";  // el \ se usa para concatenar en json indicando que NO se hizo el proceso (false)
        }


        
        break;
    case "eliminarContacto":
        System.out.println("Eliminar contacto");
        int identificacion = Integer.parseInt(request.getParameter("identificacion"));
        if(c.borrarContacto(identificacion)){
         respuesta += "\"" + proceso + "\": true";  // el \ se usa para concatenar en json indicando que se hizo el proceso (true)
        } else{
            respuesta += "\"" + proceso + "\": false";  // el \ se usa para concatenar en json indicando que NO se hizo el proceso (false)
        }
        
        break;
    case "listarContactos":
        System.out.println("Listar Contactos");
        List<Contacto> listaContactos = c.listarContactos();
        if(listaContactos.isEmpty()){
            respuesta += "\"" + proceso + "\": true,\"Contactos\":[]"; //genera una lista vacía en el json
        } else{
            respuesta += "\"" + proceso + "\": true,\"Contactos\":" + new Gson().toJson(listaContactos); //guarda la lista en el json
        }
        
        break;
    //case "listarUnContacto":
    //    break;
        
    default:
        respuesta += "\"ok\": false,";
        respuesta += "\"error\": \"INVALID\",";
        respuesta += "\"errorMsg\": \"Lo sentimos, los datos que ha enviado,"
                + " son inválidos. Corrijalos y vuelva a intentar por favor.\"";

        
}

            // cierra la respuesta
respuesta += "}";
response.setContentType("application/json;charset=iso-8859-1");
out.print(respuesta);
        

%>