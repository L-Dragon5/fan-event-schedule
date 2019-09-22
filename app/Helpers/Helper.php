<?php

if (!function_exists('return_json_message')) {
  function return_json_message($message, $statusCode) {
    return response()->json(['message' => $message], $statusCode);
  }
}