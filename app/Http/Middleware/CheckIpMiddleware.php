<?php

namespace App\Http\Middleware;

use Closure;

class CheckIpMiddleware
{
    public $whiteIps = ['192.168.1.1', '127.0.0.1'];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!in_array($request->ip(), $this->whiteIps)) {
            return response()->json(['message' => 'Your IP address is not valid'], 401);
        }
        return $next($request);
    }
}
