>+W::Up
>+S::Down
>+A::Left
>+D::Right

<!+d::
{
    CurrentDateTime := FormatTime(, "yyyy-MM-dd HH:mm")
    SendInput(CurrentDateTime)
}
return