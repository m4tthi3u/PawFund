from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_pet_adoption():
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)
    wait = WebDriverWait(driver, 10)

    try:
        driver.get("http://localhost:3000/dang-nhap")
        username_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Tài khoản']")))
        username_input.send_keys("testuser")
        password_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Mật khẩu']")))
        password_input.send_keys("Test@123")
        login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'login__submit')]")))
        login_button.click()
        time.sleep(2)

        print("Clicking first adopt button...")
        driver.get("http://localhost:3000/nhan-nuoi/chi-tiet/57")
        first_adopt_button = wait.until(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, "button.button-submit[type='submit']")
        ))
        driver.execute_script("arguments[0].scrollIntoView(true);", first_adopt_button)
        time.sleep(2)
        first_adopt_button.click()


        print("Clicking second adopt button...")
        driver.get("http://localhost:3000/nha")
        second_adopt_button = wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//div[contains(@class, 'shopping__checkout')]//button[contains(@class, 'button-submit') and contains(text(), 'Nhận Nuôi')]")
        ))
        driver.execute_script("arguments[0].scrollIntoView(true);", second_adopt_button)
        time.sleep(3)
        second_adopt_button.click()


        confirm_button = wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[text()='Xác nhận nhận nuôi']")
        ))
        confirm_button.click()

        time.sleep(2)
        driver.refresh()
        time.sleep(2)

        print("Test completed successfully!")

    except Exception as e:
        print(f"Test failed: {str(e)}")
        driver.save_screenshot("error_screenshot.png")

    finally:
        time.sleep(3)
        driver.quit()

if __name__ == "__main__":
    test_pet_adoption()
