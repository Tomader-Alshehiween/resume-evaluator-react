from fastapi import APIRouter, Depends, HTTPException, status

import store

from auth_utils import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)

from schemas import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(request: RegisterRequest):
    if request.email in store.users:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = hash_password(request.password)

    store.users[request.email] = {
        "email": request.email,
        "hashed_password": hashed_password,
        "role": "user",
    }

    return UserResponse(
        email=request.email,
        role="user",
    )


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    user = store.users.get(request.email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    password_is_valid = verify_password(
        request.password,
        user["hashed_password"],
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(user["email"])

    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserResponse)
def get_me(current_user_email: str = Depends(get_current_user)):
    user = store.users.get(current_user_email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return UserResponse(
        email=user["email"],
        role=user["role"],
    )