/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('prueba', []);
app.controller('primerController', function ($scope, $http) {

    $scope.guardarContacto = function () {
        
        let regexNumbers = /^[0-9]*$/; // Expresion regular para solo números
        if ($scope.identificacion === undefined || $scope.nombre === undefined) {
            alert('Todos los campos son obligatorios');
        } else if (!regexNumbers.test($scope.identificacion)) {
            alert('La identificacion debe ser un número');
        } else {

            let contacto = {
                proceso: "guardarContacto",
                identificacion: $scope.identificacion,
                nombre: $scope.nombre,
                apellido: $scope.apellido,
                genero: $scope.genero,
                tipoIdentificacion: $scope.tipoIdentificacion,
                telefono: $scope.telefono,
                direccion: $scope.direccion,
                correo: $scope.correo
            };
            console.log(contacto);
            $http({
                method: 'POST',
                url: 'peticionesContacto.jsp',
                params: contacto
            }).then(function (respuesta) {
                console.log(respuesta);
                alert('Guardado exitoso');
                $scope.listarContactos();
            }).catch(function(error){
                alert('Servicio no disponible, intentelo más tarde');
                console.log(error);
            });
        }
    };

    $scope.listarContactos = function () {
        console.log('Entra listar contactos');
        $scope.mostrarListaContactos = true;
        let params = {
            proceso: 'listarContactos'
        };
        $http({
            method: 'GET',
            url: 'peticionesContacto.jsp', //automaticamente completa la URL con el nombre del proyecto
            params: params
        }).then(function (respuesta) {
            $scope.contactos = respuesta.data.Contactos;
            console.log(respuesta);
            console.log($scope.contactos);
        });
    };

    $scope.borrarContacto = function (identificacion) {
        let params = {
            proceso: 'eliminarContacto',
            identificacion: identificacion
        };

        $http({
            method: 'GET', //'DELETE', jsp no permite un delete
            url: 'peticionesContacto.jsp',
            params: params
        }).then(function(respuesta){
            console.log(respuesta);
            alert('Borrado exitoso');
            $scope.listarContactos(); //para actualizar el listado de contactos
        });
    };
    
    $scope.actualizarContacto = function(){
        let contacto = {
                proceso: "actualizarContacto",
                identificacion: $scope.identificacion,
                nombre: $scope.nombre,
                apellido: $scope.apellido,
                genero: $scope.genero,
                tipoIdentificacion: $scope.tipoIdentificacion,
                telefono: $scope.telefono,
                direccion: $scope.direccion,
                correo: $scope.correo
            
        };
        
        $http({
            method: 'POST',
            url: 'peticionesContacto.jsp',
            params: contacto
        }).then(function (respuesta) {
            if (respuesta.data.actualizarContacto) {
                alert('Actualización exitosa');
                $scope.listarContactos();
            } else {
                alert('Error al actualizar');
            }
        });
    };
    
    $scope.mostrarFormularioMetodo = function(){
        $scope.mostrarListaContactos = false;
        $scope.actualizar = false;
        $scope.identificacion = undefined;
        $scope.nombre = undefined;
        $scope.apellido = undefined;
        $scope.genero = undefined;
        $scope.tipoIdentificacion = undefined;
        $scope.telefono = undefined;
        $scope.direccion = undefined;
        $scope.correo = undefined;

    };
    
    $scope.mostrarFormularioActualizar = function (contacto) {
        $scope.mostrarListaContactos = false;
        $scope.actualizar = true;
        $scope.identificacion = contacto.identificacion;
        $scope.nombre = contacto.nombre;
        $scope.apellido = contacto.apellido;
        $scope.genero = contacto.genero;
        $scope.tipoIdentificacion = contacto.tipoIdentificacion;
        $scope.telefono = contacto.telefono;
        $scope.direccion = contacto.direccion;
        $scope.correo = contacto.correo;
    };

});
