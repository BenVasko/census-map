angular
    .module("App", ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
        .when("/map", {
        template: `<data></data>`
        })
        .otherwise({ redirectTo: "/map" });
});