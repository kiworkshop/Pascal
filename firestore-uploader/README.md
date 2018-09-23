# Firestore uploader

본 프로그램은 csv 포맷으로 저장되어있는 상표 소스 데이터를 firebase의 firestore에 업로드하는 모듈입니다.

500개 단위로 일괄 저장(batch write)합니다.



## 설치 및 실행

1. 파이썬 가상환경을 활성화 후 프로그램을 실행하기 위해 필요한 모듈을 설치합니다.

   ```
   . venv/bin/activate
   pip install -r requirements.txt
   ```

2. 구글 클라우드 API를 사용하기 위하여 환경 변수에 서비스 계정의 암호 키 파일을 등록합니다. [(참조)](https://googlecloudplatform.github.io/google-cloud-python/latest/core/auth.html)

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/keyfile.json"
   ```

3. 실행

   ```bash
   python firestore_uploader.py
   ```