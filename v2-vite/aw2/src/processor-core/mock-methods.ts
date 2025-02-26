// Метод для поиска всех простых чисел до n (Решето Эратосфена)
export function sieveOfEratosthenes(n: number): number[] {
    let primes: boolean[] = Array(n + 1).fill(true);
    primes[0] = primes[1] = false;
    for (let i = 2; i * i <= n; i++) {
        if (primes[i]) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes.map((isPrime, idx) => isPrime ? idx : null).filter((v): v is number => v !== null);
}

// Метод для вычисления чисел Фибоначчи (рекурсия + мемоизация)
export function fibonacci(n: number, memo: Record<number, number> = {}): number {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// Метод для быстрого возведения в степень (алгоритм быстрого возведения в степень)
export function fastPower(base: number, exp: number, mod: number): number {
    let result = 1;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result;
}

// Метод для сортировки большого массива (быстрая сортировка)
export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    let pivot: number = arr[Math.floor(arr.length / 2)];
    let left: number[] = arr.filter(x => x < pivot);
    let middle: number[] = arr.filter(x => x === pivot);
    let right: number[] = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Метод для проверки, является ли число палиндромом
export function isPalindrome(num: number): boolean {
    let str: string = num.toString();
    return str === str.split('').reverse().join('');
}

// Метод для нахождения наибольшего общего делителя (алгоритм Евклида)
export function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
