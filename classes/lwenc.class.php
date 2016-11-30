<?php
	/*
		Copyright (c) 2016 Kyle Schneiderman, http://kyleschneiderman.com/

		Permission is hereby granted, free of charge, to any person obtaining
		a copy of this software and associated documentation files (the
		"Software"), to deal in the Software without restriction, including
		without limitation the rights to use, copy, modify, merge, publish,
		distribute, sublicense, and/or sell copies of the Software, and to
		permit persons to whom the Software is furnished to do so, subject to
		the following conditions:

		The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
		LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
		OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
		WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/

	// This is a very light weight two way encryption class.
	// This is not very secure! do not encrypt sensitive data with this class
	// This class is merely an approach to obscuring data that you would not like the general public to see.

	class Lwenc {
		// Constructor
		private $size = 32;
		private $method = "basic";
		private $cipher;

		function __construct($size = 0) {		
			// If we pass in -1 it means to not create the cipher
			if ($size != -1) {
				// If arguements, set them
				$size = ($size > 0) ? $size : $this->size;
				// Then call our create cipher command
				
				$this->CreateCipher($size);
			}
		}

		// Quick setters
		public function SetSize($size) {
			// Set the size of cipher
			if ($size > 0) {
				$this->size = $size;
			}
		}

		public function SetCipherType($type) {
			// Set the cipher type for creating new ciphers
			if ($type) {
				$this->method = $type;
			}
		}

		public function SetCipher($cipher = null) {
			// Set the ciper
			if (!isset($cipher) || !$cipher || !is_string($cipher))
				return false; 

			$this->cipher = $cipher;
			return true;
		}

		// Getter
		public function GetCipher() {
			return $this->cipher;
		}

		// Userful functions
		public function CreateCipher($size = 0, $method = null) {
			$size = ($size > 0) ? $size : $this->size;
			$method = ($method) ? $method : $this->method;
			
			// Creates a cipher for use based on arguements 
			switch ($method) {
				case "basic":
					$this->cipher = $this->generateBasic($size);
					break;
				default:
					$this->cipher = $this->generateBasic($size);
					break;
			}
		}

		public function Encode($key = null, $cipher = null) {
			// Will encrypt the key using the set cipher
			$cipher = ($cipher) ? $cipher : $this->cipher;
			$size = ($cipher) ? strlen($cipher) : $this->size;
			
			if ($key) {
				// Then let's start our encrypting process
				$length = strlen($key);
				$count = 0;
				$holding = '';
				
				for($i=0; $i < $length; $i++) {
					// Itterate count through each loop
					$holding .= ord($key[$i]) + ord($cipher[$count]);
					if ($i < $length - 1)
						$holding .= '-';
						
					// If count > size, start over
					$count = ($count > $size-1) ? 0 : $count + 1;
				}
				return base64_encode($holding);
			}
			return false;
		}

		public function Decode($key = null, $cipher = null) {
			// If a key is passed in, use that key, otherwise attempt to decode using stored cipher
			$cipher = ($cipher) ? $cipher : $this->cipher;
			$size = ($cipher) ? strlen($cipher) : $this->size;
			
			if ($key && is_string($cipher)) {
				$key = base64_decode($key);
				$keyArray = explode('-', $key);
				$length = count($keyArray);
				$count = 0;
				$returnString = '';
			
				for ($i=0; $i<$length; $i++) {
					$returnString .= chr($keyArray[$i] - ord($cipher[$count]));
					$count = ($count > $size-1) ? 0 : $count + 1;
				}
				
				return $returnString;
			}
            
            return false;
		}
		
		public function Debug() {
			// Quickly debug what currently is set as private member variables
			echo ('<p id="method">' . $this->method . '</p>');
			echo ('<p id="size">' . $this->size . '</p>');
			echo ('<p id="cipher">' . $this->cipher . '</p>');
		}

		private function generateBasic($size) {
			$size = ($size > 0) ? $size : $this->size;
			$string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
		    $cipher = '';
		    for ($i = 0; $i < $size; $i++) {
		        $cipher .= $string[rand(0, strlen($string)-1)];
		    }

		    return $cipher;
		}

	}
?>