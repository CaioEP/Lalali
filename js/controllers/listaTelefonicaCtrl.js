angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, $http) {
    $scope.index = -1;
    $scope.titulo = "Lista Telefônica";
    $scope.btnPersistir = "Add";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function () {
        $http.get("http://localhost:3412/contatos").then(function (resultado, status) {
            $scope.contatos = resultado.data;
        });
    };

    var carregarOperadoras = function () {
        $http.get("http://localhost:3412/operadoras").then(function (resultado, status) {
            $scope.operadoras = resultado.data;
        });
    };

    $scope.adicionarContato = function (contato) {
        if ($scope.index !== -1) {
            $scope.contatos[$scope.index] = contato;
        } else {
            $http.post("http://localhost:3412/contatos", contato).then(function (data) {
                $scope.formContato.$setPristine();
                delete $scope.contato;
                carregarContatos();
            });
        }
        $scope.btnPersistir = "Add";
        $scope.index = -1;
    };

    $scope.removerContato = function (contato) {
        $scope.contatos.splice($scope.contatos.indexOf(contato), 1);
        delete $scope.contato;
    };

    $scope.alterarContato = function (contato) {
        $scope.contato = angular.copy(contato);
        $scope.index = $scope.contatos.indexOf(contato);
        $scope.btnPersistir = "Update";
    };

    $scope.ordenarPor = function (campo) {
        $scope.campoOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };

    carregarOperadoras();
    carregarContatos();
});