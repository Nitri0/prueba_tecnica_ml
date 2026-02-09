"""Repositorio CSV para Payment"""

import csv
import os
from typing import List
from domain.payment.entity.payment import Payment, PaymentMethodType


class PaymentRepository:
    """Repositorio que lee métodos de pago desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "payment.csv")

    def get_all(self) -> List[Payment]:
        """Obtiene todos los métodos de pago disponibles"""
        payments = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    payment = Payment(
                        id=row['id'],
                        name=row['name'],
                        image_url=row['image_url'],
                        type=PaymentMethodType(row['type'])
                    )
                    payments.append(payment)
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading payment CSV: {e}")
        return payments

    def get_max_installments(self) -> int:
        """Obtiene el máximo número de cuotas disponible"""
        max_inst = 1
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    installments = int(row['max_installments'])
                    if installments > max_inst:
                        max_inst = installments
        except (FileNotFoundError, Exception) as e:
            print(f"Error reading max installments: {e}")
        return max_inst
