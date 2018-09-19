angular
    .module("App", ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
        .when("/map", {
            template: `<data></data>`
        })
        .when("/compare", {
            template: `<compare></compare>`
        })
        .otherwise({ redirectTo: "/map" });
});