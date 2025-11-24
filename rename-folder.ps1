# Script to rename folder from app-foods to app-books
# Run this script after closing Cursor/VS Code

$oldName = "D:\test2\app-foods"
$newName = "D:\test2\app-books"

if (Test-Path $oldName) {
    try {
        Rename-Item -Path $oldName -NewName "app-books" -Force
        Write-Host "Successfully renamed folder from app-foods to app-books!" -ForegroundColor Green
        Write-Host "Please reopen Cursor and open the new folder: $newName" -ForegroundColor Yellow
    }
    catch {
        Write-Host "Error: Cannot rename folder. Make sure Cursor/VS Code is closed." -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}
else {
    if (Test-Path $newName) {
        Write-Host "Folder has already been renamed to app-books!" -ForegroundColor Green
    }
    else {
        Write-Host "Folder not found at: $oldName" -ForegroundColor Red
    }
}

