var sum_to_n_a = function(n) {
    // your code here
    if (n <= 0) return 0;
    return n + sum_to_n_a(n - 1);
};

var sum_to_n_b = function(n) {
    // your code here
    var total = 0;
    for (var i = n; i > 0; i--) {
        total += i;
    }
    return total;
};

var sum_to_n_c = function(n) {
    // your code here
    return n*(n+1)/2;
};