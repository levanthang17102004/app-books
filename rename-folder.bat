@echo off
echo Renaming folder from app-foods to app-books...
echo.
echo IMPORTANT: Please close Cursor/VS Code before running this script!
echo.
pause

cd /d D:\test2

if exist "app-foods" (
    ren "app-foods" "app-books"
    echo.
    echo Successfully renamed folder!
    echo Please reopen Cursor and open the new folder: D:\test2\app-books
) else (
    if exist "app-books" (
        echo Folder has already been renamed to app-books!
    ) else (
        echo Folder not found!
    )
)

echo.
pause

