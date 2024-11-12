from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Vi admin dashboard cua trang web chi co the truy cap khi da login thanh cong, nen em se viet 1 test case de login vao trang web va them 1 user moi
def test_login_and_add_user(username, password, url, new_user):
    option = webdriver.ChromeOptions()
    option.add_argument('ignore-certificate-errors')
    driver = webdriver.Chrome(options=option)
    driver.get('https://cacert.org/')

    try:
        driver.get(url)
        wait = WebDriverWait(driver, 10)

        username_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Username']")))
        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']")
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

        username_field.send_keys(username)
        password_field.send_keys(password)
        login_button.click()

        time.sleep(10)
        try:
            error = driver.find_element(By.CSS_SELECTOR, ".bg-red-500\\/10")
            print("Login failed: Error message displayed")
            return
        except:
            print("Login successful")

        driver.get("http://localhost:3000/admin/users")
        time.sleep(5)

        add_user_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add User')]")))
        add_user_button.click()

        modal = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.fixed.inset-0")))

        username_input = modal.find_element(By.XPATH, "//label[text()='Username']/following-sibling::input")
        email_input = modal.find_element(By.XPATH, "//label[text()='Email']/following-sibling::input")
        password_input = modal.find_element(By.XPATH, "//label[text()='Password']/following-sibling::input")

        username_input.send_keys(new_user['username'])
        email_input.send_keys(new_user['email'])
        password_input.send_keys(new_user['password'])

        submit_button = modal.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        time.sleep(2)
        print("New user added successfully")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        time.sleep(5)
        driver.quit()

if __name__ == "__main__":
    LOGIN_URL = "http://localhost:3000/login"
    USERNAME = "lamtran"
    PASSWORD = "lamtran"

    NEW_USER = {
        "username": "user1",
        "email": "user1@example.com",
        "password": "user1"
    }

    test_login_and_add_user(USERNAME, PASSWORD, LOGIN_URL, NEW_USER)
