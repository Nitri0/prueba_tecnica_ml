"""Tests para el serializer de API"""

import pytest
from dataclasses import dataclass
from enum import Enum
from typing import List, Dict, Optional

from infrastructure.api.FastAPI.serializer import to_camel_case, serialize_to_dict


class TestToCamelCase:
    """Tests para conversión snake_case → camelCase"""

    def test_simple_conversion(self):
        """Debe convertir snake_case simple a camelCase"""
        assert to_camel_case("hello_world") == "helloWorld"
        assert to_camel_case("user_name") == "userName"

    def test_single_word(self):
        """Debe mantener palabra única sin cambios"""
        assert to_camel_case("hello") == "hello"
        assert to_camel_case("test") == "test"

    def test_multiple_underscores(self):
        """Debe manejar múltiples underscores"""
        assert to_camel_case("this_is_a_long_name") == "thisIsALongName"
        assert to_camel_case("product_rating_average") == "productRatingAverage"

    def test_trailing_underscore(self):
        """Debe manejar underscores al final"""
        assert to_camel_case("test_name_") == "testName"

    def test_leading_underscore(self):
        """Debe manejar underscores al inicio (los elimina)"""
        result = to_camel_case("_private_var")
        # La función elimina el underscore al inicio
        assert result == "PrivateVar"

    def test_empty_string(self):
        """Debe manejar string vacío"""
        assert to_camel_case("") == ""


class TestSerializeToDict:
    """Tests para serialización completa a dict"""

    def test_serialize_primitive_types(self):
        """Debe mantener tipos primitivos sin cambios"""
        assert serialize_to_dict("hello") == "hello"
        assert serialize_to_dict(42) == 42
        assert serialize_to_dict(3.14) == 3.14
        assert serialize_to_dict(True) is True
        assert serialize_to_dict(None) is None

    def test_serialize_enum(self):
        """Debe serializar enum a su valor"""
        class Color(Enum):
            RED = "red"
            BLUE = "blue"

        assert serialize_to_dict(Color.RED) == "red"
        assert serialize_to_dict(Color.BLUE) == "blue"

    def test_serialize_list(self):
        """Debe serializar listas recursivamente"""
        data = ["hello", 42, True]
        result = serialize_to_dict(data)
        assert result == ["hello", 42, True]

    def test_serialize_nested_list(self):
        """Debe serializar listas anidadas"""
        data = [[1, 2], [3, 4]]
        result = serialize_to_dict(data)
        assert result == [[1, 2], [3, 4]]

    def test_serialize_dict_with_string_keys(self):
        """Debe convertir keys de string a camelCase"""
        data = {
            "user_name": "John",
            "user_age": 30,
            "is_active": True
        }
        result = serialize_to_dict(data)
        assert result == {
            "userName": "John",
            "userAge": 30,
            "isActive": True
        }

    def test_serialize_dict_with_numeric_keys(self):
        """Debe preservar keys numéricas (rating_distribution)"""
        data = {
            5: 850,
            4: 250,
            3: 89,
            2: 35,
            1: 23
        }
        result = serialize_to_dict(data)
        assert result == {5: 850, 4: 250, 3: 89, 2: 35, 1: 23}

    def test_serialize_nested_dict(self):
        """Debe serializar dicts anidados"""
        data = {
            "user_info": {
                "first_name": "John",
                "last_name": "Doe"
            }
        }
        result = serialize_to_dict(data)
        assert result == {
            "userInfo": {
                "firstName": "John",
                "lastName": "Doe"
            }
        }

    def test_serialize_dataclass(self):
        """Debe serializar dataclass a dict con camelCase"""
        @dataclass
        class Person:
            first_name: str
            last_name: str
            age: int

        person = Person(first_name="John", last_name="Doe", age=30)
        result = serialize_to_dict(person)

        assert result == {
            "firstName": "John",
            "lastName": "Doe",
            "age": 30
        }

    def test_serialize_dataclass_with_enum(self):
        """Debe serializar dataclass con enum"""
        class Status(Enum):
            ACTIVE = "active"
            INACTIVE = "inactive"

        @dataclass
        class User:
            user_name: str
            status: Status

        user = User(user_name="john", status=Status.ACTIVE)
        result = serialize_to_dict(user)

        assert result == {
            "userName": "john",
            "status": "active"
        }

    def test_serialize_dataclass_with_optional(self):
        """Debe serializar dataclass con campos opcionales"""
        @dataclass
        class Product:
            name: str
            original_price: Optional[int] = None

        # Con valor
        p1 = Product(name="iPhone", original_price=1000)
        result1 = serialize_to_dict(p1)
        assert result1 == {"name": "iPhone", "originalPrice": 1000}

        # Sin valor
        p2 = Product(name="Samsung")
        result2 = serialize_to_dict(p2)
        assert result2 == {"name": "Samsung", "originalPrice": None}

    def test_serialize_dataclass_with_list(self):
        """Debe serializar dataclass con listas"""
        @dataclass
        class Team:
            team_name: str
            member_names: List[str]

        team = Team(team_name="DevTeam", member_names=["Alice", "Bob"])
        result = serialize_to_dict(team)

        assert result == {
            "teamName": "DevTeam",
            "memberNames": ["Alice", "Bob"]
        }

    def test_serialize_dataclass_with_nested_dataclass(self):
        """Debe serializar dataclass anidados"""
        @dataclass
        class Address:
            street_name: str
            city_name: str

        @dataclass
        class Person:
            full_name: str
            home_address: Address

        person = Person(
            full_name="John Doe",
            home_address=Address(street_name="Main St", city_name="NYC")
        )
        result = serialize_to_dict(person)

        assert result == {
            "fullName": "John Doe",
            "homeAddress": {
                "streetName": "Main St",
                "cityName": "NYC"
            }
        }

    def test_serialize_complex_nested_structure(self):
        """Debe serializar estructura compleja anidada"""
        class Level(Enum):
            GOLD = "gold"
            SILVER = "silver"

        @dataclass
        class Reputation:
            total_sales: int
            seller_level: Level

        @dataclass
        class Seller:
            seller_name: str
            is_official: bool
            seller_reputation: Reputation

        seller = Seller(
            seller_name="TechStore",
            is_official=True,
            seller_reputation=Reputation(total_sales=5000, seller_level=Level.GOLD)
        )
        result = serialize_to_dict(seller)

        assert result == {
            "sellerName": "TechStore",
            "isOfficial": True,
            "sellerReputation": {
                "totalSales": 5000,
                "sellerLevel": "gold"
            }
        }

    def test_serialize_list_of_dataclasses(self):
        """Debe serializar lista de dataclasses"""
        @dataclass
        class Item:
            item_name: str
            item_price: int

        items = [
            Item(item_name="Phone", item_price=1000),
            Item(item_name="Laptop", item_price=2000)
        ]
        result = serialize_to_dict(items)

        assert result == [
            {"itemName": "Phone", "itemPrice": 1000},
            {"itemName": "Laptop", "itemPrice": 2000}
        ]

    def test_serialize_dict_with_dataclass_values(self):
        """Debe serializar dict con dataclass como valores"""
        @dataclass
        class Config:
            max_retries: int
            timeout_seconds: int

        configs = {
            "api_config": Config(max_retries=3, timeout_seconds=30),
            "db_config": Config(max_retries=5, timeout_seconds=60)
        }
        result = serialize_to_dict(configs)

        assert result == {
            "apiConfig": {
                "maxRetries": 3,
                "timeoutSeconds": 30
            },
            "dbConfig": {
                "maxRetries": 5,
                "timeoutSeconds": 60
            }
        }

    def test_preserve_numeric_keys_in_nested_structure(self):
        """Debe preservar keys numéricas en estructuras anidadas"""
        @dataclass
        class Stats:
            rating_distribution: Dict[int, int]

        stats = Stats(rating_distribution={5: 100, 4: 50, 3: 25})
        result = serialize_to_dict(stats)

        assert result == {
            "ratingDistribution": {
                5: 100,
                4: 50,
                3: 25
            }
        }
