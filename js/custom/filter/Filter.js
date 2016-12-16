/**
 * Created by iago on 11/08/16.
 */
'use strict';

detranApp.filter('searchArrayFilter', function() {

    return function(arr, searchString) {

        if(!searchString) {
            return arr;
        }

        searchString = searchString.toLowerCase();

        var result = [];

        angular.forEach(arr, function(el){
            if(el.title.toLowerCase().indexOf(searchString) != -1) {
                result.push(el);
            }
        });

        return result;
    };
});

detranApp.filter('getByCodigo', function() {
    return function(input, codigo) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (input[i].codigo ===codigo) {
                return input[i];
            }
        }
        return null;
    }
});

detranApp.filter('getCpfOrCnpj', function ($filter) {
    return function(cpfCnpj) {
        if (cpfCnpj){
            if(cpfCnpj.length === 11){
                return $filter('brCpf')(cpfCnpj);
            } else {
                return $filter('brCnpj')(cpfCnpj);
            }
            return null;
        }
    }
});


detranApp.filter('getCheckedItens', function ($filter) {
    return function(array) {
        var filteredArray = [];
        if ($filter){
            filteredArray = $filter('filter')(array, {checked: true});
            return filteredArray;
        }
    }
});