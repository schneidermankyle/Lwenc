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

function Lwenc() {
    //////////////////////////////
    ////      privates        ////
    //////////////////////////////
    var _size = 32;
    var _method = 'basic';
    var _cipher;
    
    var __construct = function(size = 0) {
        // If we pass in -1 it means to not create the cipher
        if (size != -1) {
            // If arguements, set them
            size = (size > 0) ? size : _size;
            // Then call our create cipher command
            _createCipher(size);
        }
    };
    
    // Our method for creating a cipher and storing it in our class
    var _createCipher = function(size = 0, method = null) {
         size = (size > 0) ? size : _size;
         method = (method) ? method : _method;
         
         // Creates a cipher for use based on arguements
         switch (method) {
             case "basic":
                _cipher = _generateBasic(size);
                break;
             default:
                 _cipher = _generateBasic(size);
                break;
         }
    };
    
    // Generates a very basic cipher string
    var _generateBasic = function(size) {
        size = (size > 0) ? size : _size;
        var string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
        cipher = '';
        
        for (var i = 0; i < size; i++) {
            cipher += string.charAt(Math.floor(Math.random() * string.length-1));
        }
        
        return cipher;
    };
    
    
    //////////////////////////////
    ////      Publics         ////
    //////////////////////////////
    
    ////// Setters //////
    
    // Sets the size of our cipher
    this.SetSize = function(size) {
        if (size > 0)
            _size = size;
    };
    
    // Sets the the encryption type
    this.SetCipherType = function(type) {
        if (type)
           _method = type; 
    };
    
    // Sets the cipher if external is generated
    this.SetCipher = function(cipher = null) {
        if (cipher === undefined || typeof(cipher) !== "string")
            return false;

        _cipher = cipher;
        return true;
    };
    
    // This is just public access for _createCipher3
    this.CreateCipher = function(size, method) {
        _createCipher(size, method);
    };
    
    ////// Getters //////
    this.GetCipher = function() {
        return _cipher;
    };


    ////// Useful functions //////
    
    // Encrypts a given key and optionally accepts a cipher
    this.Encode = function(key = null, cipher = null) {
        cipher = (cipher) ? cipher : _cipher;
        var size = (cipher) ? cipher.length : _size;
        
        if (key) {
            var length = key.length,
                count = 0,
                holding = '';
                
            for (var i = 0; i < length; i++) {
               holding += (key.charAt(i).charCodeAt(0) + cipher.charAt(count).charCodeAt(0));
               if (i < length - 1)
                   holding += '-';
                
               count = (count > size-1) ? 0 : count + 1; 
            }
            // Need to insert base64 encode
            return window.btoa(holding);
        }
        return false;
    };
    
    // Decrypts the provided key given a valid cipher
    this.Decode = function(key = null, cipher = null) {
        cipher = (cipher) ? cipher : _cipher;
        size = (cipher) ? cipher.length : _size;
        
        if (key && typeof(cipher) === "string") {
            key = window.atob(key);
            
            var keyArray = key.split('-'),
                length = keyArray.length,
                count = 0,
                returnString = '';
                
            for (var i = 0; i < length; i++) {
                returnString += String.fromCharCode(keyArray[i] - cipher.charAt(count).charCodeAt(0));
                
                count = (count > size-1) ? 0 : count + 1;
            }
            
            return returnString;
        }
        
        return false;
    };
    
    // Quick function to private variables 
    this.Debug = function(debugType = 'console') {
        switch (debugType) {
            case 'console':
                console.log(_method);
                console.log(_size);
                console.log(_cipher);
                break;
            case 'print':
                
                break;
            default:
                console.log("Error, that is not an option.");
                break;
        }
    };
    
    __construct(size = 0);
}