var app = angular.module('prueba', []);
app.controller('primerController', function ($scope, $http) {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    function alertBootstrap(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper)
    }

    $scope.guardarContacto = function () {
        $scope.actualizar = false;
        let regexNumbers = /^[0-9]*$/;
        if ($scope.identificacion === undefined || $scope.nombre === undefined) {
            alert('Todos los campos son obligatorios');
        } else if (!regexNumbers.test($scope.identificacion)) {
            alert('La identificación debe ser un número');
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
                if (respuesta.data.guardarContacto) {
                    console.log(respuesta);
                    alertBootstrap('Nice, you triggered this alert message!', 'success');
                    $scope.listarContactos();
                } else {
                    alert('Error al crear contacto');
                }

            }).catch(function (error) {
                alert('Servicio no disponible, intentelo más tarde');
                console.log(error);
            });
        }
    };

    $scope.listarContactos = function () {
        console.log('Entra listar contactos');
        $scope.mostrarListaContactos = true;
        let params = {
            proceso: "listarContactos"
        };

        $http({
            method: 'GET',
            url: 'peticionesContacto.jsp',
            params: params
        }).then(function (respuesta) {
            $scope.contactos = respuesta.data.Contactos;
            console.log($scope.contactos);
        });
    };

    $scope.eliminarContacto = function () {
        let params = {
            proceso: "eliminarContacto",
            identificacion: $scope.idParaEliminar
        };
        $http({
            method: 'GET',
            url: 'peticionesContacto.jsp',
            params: params
        }).then(function (respuesta) {
            console.log(respuesta);
            alert('Borrado exitoso');
            $scope.listarContactos();
        })
    };

    $scope.actualizarContacto = function () {
        let contacto = {
            proceso: 'actualizarContacto',
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

    $scope.mostrarFormularioMetodo = function () {
        $scope.mostrarListaContactos = false;
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

    $scope.abrirModal = function (identificacion) {
        $scope.idParaEliminar = identificacion;
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
            keyboard: false
        });
        myModal.show();
    }

});