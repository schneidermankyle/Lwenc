$(document).ready(function(){
    include('lwenc');
    
    var enc = new Lwenc(),
        text = '';
    
    enc.SetCipher($('#cipher').text().trim());
    var encryptionString = enc.Encode('testString'); 
    
    text += '<h1>Javascript test</h1><h4>JS string encoding</h4><p>string: testString<p><p>';
    text += encryptionString;
    text += '</p><br/><h4>JS string decoding</h4><p>';
    text += encryptionString;
    text += '</p><p>';
    text += enc.Decode(encryptionString);
    text += '</p>';
    
    $('#js-results').html(text);

    enc.Debug();
});