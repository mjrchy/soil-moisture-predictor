import unittest
from unittest.mock import MagicMock, patch

from schemas import SoilMoistureRequest
from services import *


class TestServices(unittest.TestCase):

    def setUp(self):
        # Mocking database connection
        self.mock_cursor = MagicMock()
        self.mock_conn = MagicMock()
        self.mock_conn.cursor.return_value.__enter__.return_value = self.mock_cursor
        self.mock_pool = MagicMock()
        self.mock_pool.connection.return_value = self.mock_conn
        self.patcher = patch('services.pool', self.mock_pool)
        self.patcher.start()

    def tearDown(self):
        self.patcher.stop()

    def test_transform_adc_to_resistance(self):
        actual_resistance = transform_adc_to_resistance(2048)
        expected_resistance = 1388.8  # Calculated from the formula
        self.assertAlmostEqual(actual_resistance, expected_resistance, places=1,
                               msg=f"Expected resistance to be {expected_resistance} but got {actual_resistance}")

    def test_fetch_weather_data(self):
        # Mocking database response
        self.mock_cursor.fetchall.return_value = [
            (1, '2024-04-19T23:53:22', 75.0, 31.0, 348128536.3636364, 16.9, 3156.0),
            (2, '2024-04-19T23:58:22', 75.0, 31.0, 348128536.3636364, 16.9, 3150.0)
        ]

        data = fetch_weather_data()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['id'], 1)

    def test_predict_soil_moisture(self):
        input_data = SoilMoistureRequest(air_humidity=75.0, temperature=31.0, pm2_5=348128536.3636364, wind_speed=16.9)
        result = predict_soil_moisture(input_data)
        self.assertTrue('soil_moisture' in result)

    def test_get_scaled_dataset(self):
        # Mocking database response
        self.mock_cursor.fetchall.return_value = [
            (1, '2024-04-19T23:53:22', 75.0, 31.0, 348128536.3636364, 16.9, 3156.0),
            (2, '2024-04-19T23:58:22', 75.0, 31.0, 348128536.3636364, 16.9, 3150.0)
        ]

        df = get_scaled_dataset()
        self.assertEqual(df.shape, (2, 5))

    # Add more tests for other functions as needed


if __name__ == '__main__':
    unittest.main()
