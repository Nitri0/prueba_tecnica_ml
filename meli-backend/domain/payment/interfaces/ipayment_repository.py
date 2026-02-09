from abc import abstractmethod

from domain.payment.entity.payment import Payment


class IPaymentRepository:
    @abstractmethod
    def get_payments(self) -> [Payment]:
        """
        :return:
        """
        raise NotImplementedError
