$(document).ready(function(){
    include('lwenc');
    
    var enc = new Lwenc(),
        text = '';
    
    enc.setCipher($('#cipher').text().trim());
    var encryptionString = enc.encrypt('testString'); 
    
    text += '<h1>Javascript test</h1><h4>JS string encryption</h4><p>Using external cipher</p><p>string: testString<p><p>';
    text += encryptionString;
    text += '</p><br/><h4>JS string decryption</h4><p>Using external cipher + string</p><p>';
    text += encryptionString;
    text += '</p><p>';
    text += enc.decrypt(encryptionString);
    text += '</p>';
    
    $('#js-results').html(text);
});